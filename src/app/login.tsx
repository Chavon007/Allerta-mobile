import { View, Text, Pressable } from "react-native";
import Form from "@/components/Form";
import { LoginDTO, LoginSchema } from "@/schema/authSchema";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/api/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();

  const handleLogin = (data: LoginDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  return (
    <SafeAreaView className="bg-background1 flex-1">
      <View className="flex-1 px-6 justify-center">
        <View>
          {/* Header */}
          <View>
            <Text className="text-3xl font-header uppercase text-text3 font-bold">
              Welcome Back
            </Text>

            <Text className="mt-2 font-body text-sm text-text3">
              Log in to reach your trusted circle.
            </Text>
          </View>

          {/* Form */}
          <Form
            className="gap-5 mt-8"
            onSubmit={handleLogin}
            schema={LoginSchema}
          >
            {(methods, submitForm) => (
              <>
                <View className="gap-4">
                  <InputField
                    label="Email Address"
                    name="email"
                    control={methods.control}
                    keyboardType="email-address"
                    placeholder="youremail@gmail.com"
                    error={methods.formState.errors.email}
                  />

                  <View>
                    <InputField
                      label="Password"
                      name="password"
                      control={methods.control}
                      secureTextEntry
                      placeholder="********"
                      error={methods.formState.errors.password}
                    />

                    <Pressable
                      className="self-end mt-2"
                      onPress={() => router.push("/")}
                    >
                      <Text className="text-xs font-body font-semibold text-text3">
                        Forgot password?
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Button
                  textClassName="text-white"
                  className="bg-background mt-2"
                  spinnerColor="#ffffff"
                  isLoading={isPending}
                  onPress={submitForm}
                  loadingText="Logging in..."
                >
                  Login
                </Button>
              </>
            )}
          </Form>

          {/* Create account */}
          <View className="items-center mt-8">
            <Text className="text-sm font-body text-text3">
              Don't have an account?
            </Text>

            <Pressable
              className="mt-1"
              onPress={() => router.push("/create-account")}
            >
              <Text className="text-sm font-body font-semibold text-text3 underline">
                Create an account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
