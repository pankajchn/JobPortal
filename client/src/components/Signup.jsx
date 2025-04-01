import { useForm } from "react-hook-form";
import {
  Container,
  Title,
  TextInput,
  Paper,
  Button,
  PasswordInput,
} from "@mantine/core";

const Signup = () => {
  const form = useForm();
  const { register, handleSubmit } = form;

  const onSubmit = (data) => console.log(data);

  return (
    <Container size="sm">
      <Paper shadow="md" p="xl" withBorder>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter a strong password"
            {...register("password")}
          />
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phoneNumber")}
          />
          <Button type="submit">Register</Button>
        </form>
      </Paper>
    </Container>
  );
};
export default Signup;
