
import { View, Text, ScrollView, Pressable } from "react-native";
import Form from "@/components/Form";
import { SignupDTO, SignupSchema } from "@/schema/authSchema";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useSignupMutation } from "@/api/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccount = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignupMutation();

  const handleSignup = (data: SignupDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <SafeAreaView className="bg-background1 flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow"
      >
        <View className="flex-1 px-6 pt-8 pb-6">
          {/* Header */}
          <View>
            <Text className="text-3xl font-header uppercase text-text3 font-bold">
              Create Your Account
            </Text>

            <Text className="mt-2 font-body text-sm leading-5 text-text3">
              Your username lets other Beacon users add you as a trusted
              contact.
            </Text>
          </View>

          {/* Form */}
          <Form
            className="gap-5 mt-8"
            onSubmit={handleSignup}
            schema={SignupSchema}
          >
            {(methods, submitForm) => (
              <>
                <View className="gap-4">
                  <InputField
                    label="Full Name"
                    name="full_name"
                    control={methods.control}
                    placeholder="John Ben"
                    error={methods.formState.errors.full_name}
                  />

                  <InputField
                    label="Email Address"
                    keyboardType="email-address"
                    placeholder="youremail@gmail.com"
                    control={methods.control}
                    name="email"
                    error={methods.formState.errors.email}
                  />

                  <View>
                    <InputField
                      label="Username"
                      placeholder="@chavon"
                      control={methods.control}
                      name="username"
                      error={methods.formState.errors.username}
                    />

                    <Text className="mt-2 px-1 text-xs font-body text-text3">
                      Available — this is how contacts find you.
                    </Text>
                  </View>

                  <InputField
                    label="Password"
                    secureTextEntry
                    placeholder="*********"
                    control={methods.control}
                    name="password"
                    error={methods.formState.errors.password}
                  />

                  <InputField
                    label="Confirm Password"
                    secureTextEntry
                    placeholder="*********"
                    control={methods.control}
                    name="confirmPassword"
                    error={methods.formState.errors.confirmPassword}
                  />
                </View>

                <Button
                  textClassName="text-white"
                  className="bg-background mt-2"
                  spinnerColor="#ffffff"
                  isLoading={isPending}
                  onPress={submitForm}
                  loadingText="Creating account..."
                >
                  Create account
                </Button>
              </>
            )}
          </Form>

          {/* Login */}
          <View className="items-center mt-8 mb-2">
            <Text className="text-sm font-body text-text3">
              Already have an account?
            </Text>

            <Pressable
              className="mt-1"
              onPress={() => router.push("/login")}
            >
              <Text className="text-sm font-body font-semibold text-text3 underline">
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
