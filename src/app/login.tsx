import { View, Text } from "react-native";
import Form from "@/components/Form";
import { LoginDTO, LoginSchema } from "@/schema/authSchema";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useRouter, Link } from "expo-router";

import { useLoginMutation } from "@/api/auth";

const Login = () => {
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();

  const handleLogin = (data: LoginDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/create-account");
      },
    });
  };

  return (
    <View className="bg-background1 gap-5 h-screen flex flex-col items-center justify-between py-12">
      <View className="flex-1 w-[95%]">
        <Text className="text-3xl font-header uppercase text-text3 font-bold">
          Welcome Back
        </Text>
        <Text className="mt-2 font-body text-sm text-text3">
          Log in to reach your trusted circle.
        </Text>
        <View>
          <Form className="gap-5 py-5" onSubmit={handleLogin} schema={LoginSchema}>
            {(methods, submitForm) => (
              <>
                <View className="gap-3">
                  <InputField
                    label="Email Address"
                    name="email"
                    control={methods.control}
                    keyboardType="email-address"
                    placeholder="Youremail@gmail.com"
                    error={methods.formState.errors.email}
                  />
                  <InputField
                    label="Password"
                    name="password"
                    control={methods.control}
                    secureTextEntry
                    placeholder="*********"
                    error={methods.formState.errors.password}
                  />
                </View>

                <Button
                  textClassName="text-white"
                  className="bg-background"
                  isLoading={isPending}
                  onPress={submitForm}
                  loadingText="Logging in.."
                >
                  Login
                </Button>
              </>
            )}
          </Form>

          <View className="flex-row gap-1 justify-center items-center">
            <Text className="text-sm font-body font-normal">
              You don't have an account?
            </Text>
            <Link href="/create-account">
              <Text className="text-sm font-body italic text-text3 hover:text-text1">
                Create one
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;