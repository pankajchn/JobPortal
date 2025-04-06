import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Signup = () => {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => console.log(data);
  const selectedRole = watch("role");
  console.log(selectedRole);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[76px] py-4">
      <div className="flex justify-center items-center flex-col text-[14px] bg-white px-12 rounded-xl shadow-lg w-[40rem]">
        <div className="my-5">
          <div className="text-xl font-semibold">
            Create you <span className="text-blue-600">Opportune</span> profile
          </div>
          <p className="text-sm text-gray-600">
            Search & apply to jobs from India's No.1 Job Site
          </p>
        </div>
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <label className="font-semibold">
              Full Name<span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="What is your name?"
              {...register("name")}
            />
          </div>
          <div className="my-2">
            <label className="font-semibold">
              Email ID<span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="Tell us your Email ID"
              {...register("email")}
            />
          </div>
          <div className="my-2">
            <label className="font-semibold">
              Password<span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="(Minimum 6 characters)"
              {...register("password")}
            />
          </div>
          <div className="my-2">
            <label className="font-semibold">
              Phone Number<span className="text-orange-500">*</span>
            </label>
            <input
              type="tel"
              className="input-field"
              placeholder="+91 Enter your mobile number"
              {...register("phoneNumber")}
            />
          </div>

          <FormControl className="">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Are you a jobseeker or recruiter?
            </FormLabel>
            <RadioGroup
            className=""
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="jobSeeker"
                control={<Radio />}
                label="Jobseeker"
                {...register("role")}
              />

              <FormControlLabel
                value="recruiter"
                control={<Radio />}
                label="Recruiter"
                {...register("role")}
              />
            </RadioGroup>
          </FormControl>

          {selectedRole === "jobSeeker" && (
            <div className="my-2">
              <div className="flex flex-col">
                <h2 className="text-gray-600">Education</h2>
                <div className="flex flex-col my-1">
                  <div className="my-1">
                    <label className="font-semibold">
                      Degree<span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="block input-field"
                      placeholder="Enter your highest degree (e.g., B.Tech, B.Sc, M.Tech)"
                      {...register("degree")}
                    />
                  </div>
                  <div className="my-1">
                    <label className="font-semibold">
                      Institution<span className="text-orange-500">*</span>
                    </label>
                    <input
                      className="block input-field"
                      type="text"
                      placeholder="Enter the name of your institution (e.g., XYZ University)"
                      {...register("institution")}
                    />
                  </div>

                  <div className="my-1">
                    <label className="font-semibold">
                      Year<span className="text-orange-500">*</span>
                    </label>
                    <input
                      className="block input-field"
                      type="number"
                      placeholder="Enter the passing year (e.g., 2025)"
                      {...register("year")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-gray-600">Experience</h2>
                <div className="flex flex-col ">
                  <div className="my-1">
                    <label className="font-semibold">
                      Company Name<span className="text-orange-500">*</span>
                    </label>
                    <input
                      className="block input-field"
                      placeholder="Enter your company's name (e.g., ABC Pvt. Ltd.)"
                      type="text"
                      {...register("companyName")}
                    />
                  </div>

                  <div className="my-1">
                    <label className="font-semibold">
                      Designation<span className="text-orange-500">*</span>
                    </label>
                    <input
                      className="block input-field"
                      placeholder="Enter your job role (e.g., Frontend Developer)"
                      type="text"
                      {...register("jobRole")}
                    />
                  </div>
                  <div className="my-1">
                    <label className="font-semibold">
                      Duration<span className="text-orange-500">*</span>
                    </label>
                    <input
                      className="block input-field"
                      placeholder="Enter the duration (e.g., Jan 2023 - Dec 2024)"
                      type="number"
                      {...register("duration")}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <label className="font-semibold">
                  Skills<span className="text-orange-500">*</span>
                </label>
                <input
                  className="block input-field"
                  placeholder="Enter your skills separated by commas (e.g., HTML, CSS, JavaScript)"
                  type="text"
                  {...register("skills")}
                />
              </div>
              <div className="my-2">
                <label className="font-semibold">
                  Resume<span className="text-orange-500">*</span>
                </label>
                <input
                  className="block input-field"
                  type="file"
                  placeholder="Upload your resume (PDF format preferred)"
                  {...register("resume")}
                />
              </div>
            </div>
          )}

          {selectedRole === "recruiter" && (
            <div>
              <div className="my-2">
                <label className="font-semibold">
                  Company Name<span className="text-orange-500">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter your company's name (e.g., XYZ Pvt. Ltd.)"
                />
              </div>{" "}
              <div className="my-2">
                <label className="font-semibold">
                  Company Website<span className="text-orange-500">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter your company's website (e.g., www.xyz.com)"
                />
              </div>
            </div>
          )}

          <button
            className="rounded-full bg-blue-600 py-2 px-5 my-4 font-semibold text-white cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
