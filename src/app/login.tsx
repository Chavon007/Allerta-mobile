import { View, Text } from "react-native";
import Form from "@/components/Form";
import { LoginDTO, LoginSchema } from "@/schema/authSchema";
import { InputField } from "@/components/inputField";
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
    <View>
      <View>
        <Text>Welcome Back</Text>
        <Text>Log in to reach your trusted circle.</Text>
      </View>
      <View>
        <Form className="" onSubmit={handleLogin} schema={LoginSchema}>
          {(methods, submitForm) => (
            <>
              <View>
                <InputField
                  label="Email Address"
                  keyboardType="email-address"
                  placeholder="Youremail@gmail.com"
                  registration={methods.register("email")}
                  error={methods.formState.errors.email}
                />
                <InputField
                  label="Password"
                  secureTextEntry
                  placeholder="*********"
                  registration={methods.register("password")}
                  error={methods.formState.errors.password}
                />
              </View>

              <Button
                isLoading={isPending}
                onPress={submitForm}
                loadingText="Logging in.."
              >
                Login{" "}
              </Button>
            </>
          )}
        </Form>

        <View>
          <Text>You don't have an account?</Text>
          <Link href="/create-account">
            <Text>Create one</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Login;
