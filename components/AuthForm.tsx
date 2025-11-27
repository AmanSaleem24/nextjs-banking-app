"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import FormInput from "./FormInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data)
        setUser(newUser)
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password
        })

        if(response) 
          router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1">
          <Image
            src="./icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            HORIZON
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink  */}</div>
      ) : (
        <>
          <form
            id="form-rhf-input"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FieldGroup>
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <FormInput
                      name={"firstName" }
                      label="First Name"
                      placeholder="ex: John"
                      control={form.control}
                      type="text"
                    />
                    <FormInput
                      name={"lastName" }
                      label="Last Name"
                      placeholder="ex: Doe"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <FormInput
                    name={"address1"}
                    label="Address"
                    placeholder="Enter your specific address"
                    control={form.control}
                    type="text"
                  />
                  <FormInput
                    name={"city"}
                    label="City"
                    placeholder="City"
                    control={form.control}
                    type="text"
                  />
                  <div className="flex gap-4">
                    <FormInput
                      name={"state" }
                      label="State"
                      placeholder="ex: NY"
                      control={form.control}
                      type="text"
                    />
                    <FormInput
                      name={"postalCode"}
                      label="Postal Code"
                      placeholder="ex: 11101"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FormInput
                      name={"dateOfBirth" }
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      control={form.control}
                      type="text"
                    />
                    <FormInput
                      name={"ssn"}
                      label="SSN"
                      placeholder="ex: 1234"
                      control={form.control}
                      type="text"
                    />
                  </div>
                </>
              )}

              <FormInput
                name={"email" }
                label="Email"
                placeholder="Enter your email"
                control={form.control}
                type="email"
              />
              <FormInput
                name={"password"}
                label="Password"
                placeholder="Enter your password"
                control={form.control}
                type="password"
              />
            </FieldGroup>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />{" "}
                    &nbsp;Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;



























































// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Loader2 } from "lucide-react";
// import FormInput from "./FormInput";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { authFormSchema } from "@/lib/utils";

// const AuthForm = ({ type }: { type: string }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const formSchema = authFormSchema(type);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues:
//       type === "sign-in"
//         ? {
//             email: "",
//             password: "",
//           }
//         : ({
//             firstName: "",
//             lastName: "",
//             address1: "",
//             state: "",
//             dateOfBirth: "",
//             ssn: "",
//             postalCode: "",
//             email: "",
//             password: "",
//           } as any),
//   });

//   function onSubmit(data: z.infer<typeof formSchema>) {
//     console.log(data);
//   }

//   return (
//     <section className="auth-form">
//       <header className="flex flex-col gap-5 md:gap-8">
//         <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1">
//           <Image
//             src="./icons/logo.svg"
//             width={34}
//             height={34}
//             alt="Horizon Logo"
//           />
//           <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
//             HORIZON
//           </h1>
//         </Link>
//         <div className="flex flex-col gap-1 md:gap-3">
//           <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
//             {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
//           </h1>
//           <p className="text-16 font-normal text-gray-600">
//             {user
//               ? "Link your account to get started"
//               : "Please enter your details"}
//           </p>
//         </div>
//       </header>
//       {user ? (
//         <div className="flex flex-col gap-4">{/* PlaidLink  */}</div>
//       ) : (
//         <>
//           <form
//             id="form-rhf-input"
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-8"
//           >
//             <FieldGroup>
//               {type === "sign-up" && (
//                 <>
//                   <div className="flex gap-4">
//                     <FormInput
//                       name="firstName"
//                       label="First Name"
//                       placeholder="ex: John"
//                       control={form.control}
//                       type="text"
//                     />
//                     <FormInput
//                       name="lastName"
//                       label="Last Name"
//                       placeholder="ex: Doe"
//                       control={form.control}
//                       type="text"
//                     />
//                   </div>
//                   <FormInput
//                     name="address1"
//                     label="Address"
//                     placeholder="Enter your specific address"
//                     control={form.control}
//                     type="text"
//                   />
//                   <div className="flex gap-4">
//                     <FormInput
//                       name="state"
//                       label="State"
//                       placeholder="ex: NY"
//                       control={form.control}
//                       type="text"
//                     />
//                     <FormInput
//                       name="postalCode"
//                       label="Postal Code"
//                       placeholder="ex: 11101"
//                       control={form.control}
//                       type="text"
//                     />
//                   </div>
//                   <div className="flex gap-4">
//                     <FormInput
//                       name="dateOfBirth"
//                       label="Date of Birth"
//                       placeholder="yyyy-mm--dd"
//                       control={form.control}
//                       type="text"
//                     />
//                     <FormInput
//                       name="ssn"
//                       label="SSN"
//                       placeholder="ex: 1234"
//                       control={form.control}
//                       type="text"
//                     />
//                   </div>
//                 </>
//               )}

//               <FormInput
//                 name="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 control={form.control}
//                 type="email"
//               />
//               <FormInput
//                 name="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 control={form.control}
//                 type="password"
//               />
//             </FieldGroup>
//             <div className="flex flex-col gap-4">
//               <Button type="submit" className="form-btn" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 size={20} className="animate-spin" />{" "}
//                     &nbsp;Loading...
//                   </>
//                 ) : type === "sign-in" ? (
//                   "Sign in"
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>
//             </div>
//           </form>
//           <footer className="flex justify-center gap-1">
//             <p className="text-14 font-normal text-gray-600">
//               {type === "sign-in"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//             </p>
//             <Link
//               className="form-link"
//               href={type === "sign-in" ? "/sign-up" : "/sign-in"}
//             >
//               {type === "sign-in" ? "Sign up" : "Sign in"}
//             </Link>
//           </footer>
//         </>
//       )}
//     </section>
//   );
// };

// export default AuthForm;

