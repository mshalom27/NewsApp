import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import GoogleAuth from "@/components/shared/GoogleAuth"

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }),
  email: z.string().min({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
})

const SignUpForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      setLoading(true)
      setErrorMessage(null)

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        toast({ title: "Sign up failed! Please try again." })

        return setErrorMessage(data.message)
      }

      setLoading(false)

      if (res.ok) {
        toast({ title: "Sign up Successful!" })
        navigate("/sign-in")
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
      toast({ title: "Something went wrong!" })
    }
  }

  return (
    
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4 py-12">
  <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

    <div className="space-y-6">
      <Link to="/" className="text-4xl font-extrabold tracking-tight">
        <span className="text-amber-500">News</span>
        <span className="text-slate-800">World</span>
      </Link>

      <h2 className="text-3xl font-bold text-slate-800">
        Create a new account
      </h2>

      <p className="text-gray-600 text-base">
        Welcome to NewsWorld — your gateway to global stories.
      </p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span>Sign Up</span>
            )}
          </Button>

          <GoogleAuth />
        </form>
      </Form>

      <div className="text-center text-sm mt-6">
        <span className="text-gray-600">Already have an account?</span>{' '}
        <Link to="/sign-in" className="text-amber-600 font-medium hover:underline">
          Sign In
        </Link>
      </div>

      {errorMessage && (
        <p className="mt-4 text-red-600 text-sm text-center">{errorMessage}</p>
      )}
    </div>
  </div>
</div>

  )
}

export default SignUpForm
