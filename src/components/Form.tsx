import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DRAFT_VERSION = 1;

interface FormProps<TFormValues extends FieldValues, Schema> {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (
    methods: UseFormReturn<TFormValues>,
    submitForm: () => void,
  ) => React.ReactNode;
  schema?: Schema;
  defaultValues?: Partial<TFormValues>;
  storageKey?: string;
}
const readDraft = async (storageKey: string) => {
  try {
    const raw = await AsyncStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== DRAFT_VERSION) return null;
    return parsed.values as Record<string, unknown>;
  } catch {
    return null;
  }
};

const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<any, any, any> = ZodType<any, any, any>,
>({
  className,
  onSubmit,
  children,
  schema,
  defaultValues,
  storageKey,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? (zodResolver(schema) as any) : undefined,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  useEffect(() => {
    if (!storageKey) return;

    (async () => {
      const draft = await readDraft(storageKey);
      if (!draft) return;

      if (
        schema &&
        "partial" in schema &&
        typeof (schema as any).partial === "function"
      ) {
        const result = (schema as any).partial().safeParse(draft);
        if (result.success) {
          methods.reset({ ...defaultValues, ...result.data } as any);
        }
      } else {
        methods.reset({ ...defaultValues, ...draft } as any);
      }
    })();
  }, [storageKey]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!storageKey) return;
    const subscription = methods.watch((values) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        try {
          await AsyncStorage.setItem(
            storageKey,
            JSON.stringify({ version: DRAFT_VERSION, values }),
          );
        } catch {
          // storage unavailable — fail silently
        }
      }, 400);
    });
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [storageKey, methods]);

  const submitForm = methods.handleSubmit(async (data) => {
    await onSubmit(data);
    if (storageKey) await AsyncStorage.removeItem(storageKey);
  });
  return <View className={className}>{children(methods, submitForm)}</View>;
};

export default Form;
