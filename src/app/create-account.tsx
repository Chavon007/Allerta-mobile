import { View, Text, ScrollView } from "react-native";
import Form from "@/components/Form";
import { SignupDTO, SignupSchema } from "@/schema/authSchema";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useRouter, Link } from "expo-router";
import { useSignupMutation } from "@/api/auth";

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
    <ScrollView>
      <View className="bg-background1 gap-5 h-fit flex flex-col items-center justify-between py-12">
        <View className="flex-1 w-[95%]">
          <Text className="text-3xl font-header uppercase text-text3 font-bold">
            Create your account
          </Text>
          <Text className="mt-2 font-body text-sm text-text3">
            Your username lets other Beacon users add you as a trusted contact.
          </Text>
          <View>
            <Form
              className="gap-5 py-5"
              onSubmit={handleSignup}
              schema={SignupSchema}
            >
              {(methods, submitForm) => (
                <>
                  <View className="gap-3">
                    <InputField
                      label="Full Name"
                      name="fullName"
                      control={methods.control}
                      placeholder="John Ben"
                      error={methods.formState.errors.fullName}
                    />
                    <InputField
                      label="Email Address"
                      keyboardType="email-address"
                      placeholder="youremail@gmail.com"
                      control={methods.control}
                      name="email"
                      error={methods.formState.errors.email}
                    />
                    <InputField
                      label="Username"
                      placeholder="@chavon"
                      control={methods.control}
                      name="username"
                      error={methods.formState.errors.username}
                    />
                    <Text className="w-[90%] mx-auto text-xs font-body text-text3">
                      Available — this is how contacts find you.
                    </Text>
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
                    className="bg-background"
                    isLoading={isPending}
                    onPress={submitForm}
                    loadingText="Creating account..."
                  >
                    Create account
                  </Button>
                </>
              )}
            </Form>

            <View className="flex-row gap-1 justify-center items-center">
              <Text className="text-sm font-body font-normal">
                Already have an account?
              </Text>
              <Link href="/login">
                <Text className="text-sm font-body italic text-text3 hover:text-text1">
                  Login
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAccount;
