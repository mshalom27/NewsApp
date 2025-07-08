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
import { useDispatch, useSelector } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice"
import GoogleAuth from "@/components/shared/GoogleAuth"

const formSchema = z.object({
  email: z.string().min({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
})

const SignInForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { loading, error: errorMessage } = useSelector((state) => state.user)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    try {
      dispatch(signInStart())

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (data.success === false) {
        toast({ title: "Sign in failed! Please try again." })

        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        dispatch(signInSuccess(data))

        toast({ title: "Sign in Successful!" })
        navigate("/")
      }
    } catch (error) {
      toast({ title: "Something went wrong!" })
      dispatch(signInFailure(error.message))
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
        Sign in to your account
      </h2>
      <p className="text-gray-600 text-base">
        Stay updated with what's happening around the globe.
      </p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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

          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span>Sign In</span>
            )}
          </Button>

          <GoogleAuth />
        </form>
      </Form>

      <div className="text-center text-sm mt-6">
        <span className="text-gray-600">Don’t have an account?</span>{' '}
        <Link to="/sign-up" className="text-amber-600 font-medium hover:underline">
          Sign Up
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

export default SignInForm
