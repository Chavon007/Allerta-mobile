import { View, Text, ScrollView } from "react-native";
import Form from "@/components/Form";
import { SignupDTO, SignupSchema } from "@/schema/authSchema";
import { InputField } from "@/components/inputField";
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
      <View>
        <View>
          <Text>Create your account</Text>
          <Text>
            Your username lets other Beacon users add you as a trusted contact.
          </Text>
          <View>
            <Form className="" onSubmit={handleSignup} schema={SignupSchema}>
              {(methods, submitForm) => (
                <>
                  <View>
                    <InputField
                      label="Full Name"
                      placeholder="John Ben"
                      registration={methods.register("fullName")}
                      error={methods.formState.errors.fullName}
                    />
                    <InputField
                      label="Email Address"
                      keyboardType="email-address"
                      placeholder="youremail@gmail.com"
                      registration={methods.register("email")}
                      error={methods.formState.errors.email}
                    />
                    <InputField
                      label="Username"
                      placeholder="@chavon"
                      registration={methods.register("username")}
                      error={methods.formState.errors.username}
                    />
                    <Text>Available — this is how contacts find you.</Text>
                    <InputField
                      label="Password"
                      secureTextEntry
                      placeholder="*********"
                      registration={methods.register("password")}
                      error={methods.formState.errors.password}
                    />
                    <InputField
                      label="Password"
                      secureTextEntry
                      placeholder="*********"
                      registration={methods.register("confirmPassword")}
                      error={methods.formState.errors.confirmPassword}
                    />
                  </View>

                  <Button
                    isLoading={isPending}
                    onPress={submitForm}
                    loadingText="Creating account..."
                  >
                    Create account
                  </Button>
                </>
              )}
            </Form>

            <View>
              <Text>Already have an account?</Text>
              <Link href="/login">
                <Text>Login</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAccount;
