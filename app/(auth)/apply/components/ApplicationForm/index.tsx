/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { InputField } from '@/app/(auth)/components/InputField';
import CookiePopup from '@/app/(auth)/components/CookiePopup';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';
import React from 'react';

export type Field = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  password?: boolean;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};

type ApplicationFormProps = {
  title: string;
  description: string;
  fields: Field[];
  formData: any;
  error: any;
  loading: boolean;
  handleChange: (e: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  acceptTerms?: boolean;
  handleCheckboxChange: (name: string, value: boolean) => void;
  showCookiePopup: boolean;
  handleAcceptCookies: () => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (open: boolean) => void;
};

export const ApplicationForm = ({
  title,
  description,
  fields,
  formData,
  error,
  loading,
  handleChange,
  handleSubmit,
  acceptTerms,
  handleCheckboxChange,
  showCookiePopup,
  handleAcceptCookies,
  showSuccessModal,
  setShowSuccessModal,
  children, // 👈 NEW
}: ApplicationFormProps & { children?: React.ReactNode }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {/* Default fields */}
            {fields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                icon={field.icon}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                error={error[field.name]}
                disabled={loading}
                password={field.password}
                show={field.show}
                setShow={field.setShow}
              />
            ))}

            {/* 👇 Any extra fields passed from parent */}
            {children}

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('acceptTerms', checked === true)
                }
                disabled={loading}
                required
              />
              <Label htmlFor="terms">
                I accept the{' '}
                <Link
                  href="/termsofuse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#15941f] hover:underline"
                >
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#15941f] hover:underline"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {error.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{error.general}</span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-4">
            <Button
              type="submit"
              disabled={loading || !acceptTerms}
              className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <span>Submit for Review</span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {showCookiePopup && <CookiePopup onAccept={handleAcceptCookies} />}

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#15941f] text-lg">
              🎉 Application Submitted Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
              Your application has been submitted successfully. <br />
              The Super Admin will get back to you within 3 days via the email
              you provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#15941f] hover:bg-[#117a1a] text-white"
            >
              <Link href="/">Okay, got it!</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// export const ApplicationForm = ({
//   title,
//   description,
//   fields,
//   formData,
//   error,
//   loading,
//   handleChange,
//   handleSubmit,
//   acceptTerms,
//   handleCheckboxChange,
//   showCookiePopup,
//   handleAcceptCookies,
//   showSuccessModal,
//   setShowSuccessModal,
// }: ApplicationFormProps) => {
//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//           <CardDescription>{description}</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="grid gap-4">
//             {fields.map((field) => (
//               <InputField
//                 key={field.name}
//                 label={field.label}
//                 icon={field.icon}
//                 name={field.name}
//                 type={field.type}
//                 placeholder={field.placeholder}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 error={error[field.name]}
//                 disabled={loading}
//                 password={field.password}
//                 show={field.show}
//                 setShow={field.setShow}
//               />
//             ))}

//             {/* ICO Registration Section */}
// <div className="space-y-2">
//   <Label htmlFor="icoRegistered" className="text-sm font-medium text-gray-700">
//     ICO Registration
//   </Label>
//   <div className="flex items-center space-x-3">
//     <Checkbox
//       id="icoRegistered"
//       name="icoRegistered"
//       checked={formData.icoRegistered}
//       onCheckedChange={(checked) =>
//         handleCheckboxChange('icoRegistered', checked === true)
//       }
//       disabled={loading}
//     />
//     <span className="text-gray-600">Are you ICO registered?</span>
//   </div>

//   {formData.icoRegistered && (
//     <InputField
//       label="ICO Registration Number"
//       name="icoNumber"
//       type="text"
//       placeholder="Enter ICO number"
//       value={formData.icoNumber}
//       onChange={handleChange}
//       error={error.icoNumber}
//       disabled={loading}
//     />
//   )}
// </div>

//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="terms"
//                 name="acceptTerms"
//                 checked={acceptTerms}
//                 onCheckedChange={(checked) =>
//                   handleCheckboxChange('acceptTerms', checked === true)
//                 }
//                 disabled={loading}
//                 required
//               />
//               <Label htmlFor="terms">
//                 I accept the{' '}
//                 <Link
//                   href="/termsofuse"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[#15941f] hover:underline"
//                 >
//                   Terms of Use
//                 </Link>{' '}
//                 <br className="md:hidden" />
//                 and{' '}
//                 <Link
//                   href="/privacypolicy"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[#15941f] hover:underline"
//                 >
//                   Privacy Policy
//                 </Link>
//               </Label>
//             </div>

//             {error.general && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                 <div className="flex items-center space-x-2 text-red-700">
//                   <AlertCircle className="h-5 w-5" />
//                   <span className="text-sm font-medium">{error.general}</span>
//                 </div>
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="mt-4">
//             <Button
//               type="submit"
//               disabled={loading || !acceptTerms}
//               className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               ) : (
//                 <span>Submit for Review</span>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>

//       {showCookiePopup && <CookiePopup onAccept={handleAcceptCookies} />}

//       <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-[#15941f] text-lg">
//               🎉 Application Submitted Successfully!
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-sm text-gray-600 mt-2">
//               Your application has been submitted successfully. <br />
//               The Super Admin will get back to you with the next 3 days via the
//               email you provided.
//               <br />
//               If you don&#39;t hear from us, then{' '}
//               <Link href="/contacts" className="underline text-[#15941f]">
//                 contact support
//               </Link>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction
//               onClick={() => setShowSuccessModal(false)}
//               className="bg-[#15941f] hover:bg-[#117a1a] text-white"
//             >
//               <Link href="/">Okay, got it!</Link>
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };
