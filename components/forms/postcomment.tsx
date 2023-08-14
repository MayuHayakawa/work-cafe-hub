"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "../ui/textarea";

import { updateUser } from "@/lib/actions/user.actions";
import { PostValidation } from "@/lib/validations/post";
import { createPost } from "@/lib/actions/post.actions";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface Props {
  userId: string;
}


function PostComment({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      cafeName: '',
      cafeUrl: '',
      cafeLocation: '',
      cafeImage: '',
      wifi: '', // free or password or non
      bathroom: '',
      outlet: '', // true or false
      comment: '',
      accountId: userId,
    },
  })

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    const blob = values.cafeImage;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged) {
      const imgRes =  await startUpload(files);

      if(imgRes && imgRes[0].fileUrl) {
        values.cafeImage = imgRes[0].fileUrl;
      }
      // if(imgRes && imgRes[0].url) {
      //   values.profile_photo = imgRes[0].url;
      // }
    }

    await createPost({
      cafeName: values.cafeName,
      cafeUrl: values.cafeUrl,
      cafeLocation: values.cafeLocation,
      cafeImage: values.cafeImage,
      wifi: values.wifi,
      bathroom: values.bathroom,
      outlet: values.outlet,
      comment: values.comment,
      author: userId,
      path: pathname
    });

    router.push("/");
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="cafeName"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Cafe Name
              </FormLabel>
              <FormControl className="flex-1 font-semibold">
                <Input
                  type="text"
                  className="border border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cafeUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Cafe Website
              </FormLabel>
              <FormControl className="flex-1 font-semibold">
                <Input
                  type="text"
                  className="border border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cafeLocation"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Cafe Location
              </FormLabel>
              <FormControl className="flex-1 font-semibold">
                <Input
                  type="text"
                  className="border border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cafeImage"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex flex-col gap-4">
                <h2>Cafe Image</h2>
              {/* <FormLabel className="account-form_image-label"> */}
                {field.value ? (
                  <Image 
                    src={field.value}
                    alt="cafeImage"
                    width={150}
                    height={150}
                    priority
                    className="object-contain"
                  />
                  ):(
                  <Image 
                    src="/assets/cafe-stand.svg"
                    alt="cafeImage"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input 
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input'"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wifi"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Wifi
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Available
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="need password" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Available with password
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="not available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Not available
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bathroom"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Bathroom
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Available
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="not available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Not available
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage  className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outlet"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-2">
              <FormLabel className="flex font-semibold">
                Outlet
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Available
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="not available" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Not available
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="flex font-semibold">
                Comment
              </FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-400">
                <Textarea
                  rows={15}
                  className="border border-gray-300"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          className="bg-secondary-100"
        >
          Share this cafe Information!
        </Button>

      </form>
    </Form>
  )
}

export default PostComment;