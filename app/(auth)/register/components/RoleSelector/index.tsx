// RoleSelector.tsx
"use client";

import { useRegister } from "../../useRegister";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldUser, CarTaxiFront, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

export const RoleSelector = () => {
  const { formData, handleRoleChange, loading, errors } = useRegister();

  return (
    <div className="space-y-2">
      <Label htmlFor="role" className="text-sm font-medium text-gray-700">
        Role
      </Label>
      <Select
        value={formData.role}
        onValueChange={(val) => handleRoleChange(val)}
        disabled={loading}
      >
        <SelectTrigger
          className={`w-full relative cursor-pointer pl-9 transition-all duration-200 focus:outline-none focus:ring-1 ${
            errors.role
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
          }`}
        >
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="relative cursor-pointer pl-9"
            value="clientadmin"
          >
            <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            Client Admin
          </SelectItem>
          <SelectItem className="relative cursor-pointer pl-9" value="driver">
            <CarTaxiFront className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            Driver
          </SelectItem>
        </SelectContent>
      </Select>
      {errors.role && (
        <div className="flex items-center text-red-600 text-sm space-x-1 mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{errors.role}</span>
        </div>
      )}
    </div>
  );
};

// import React from "react";
// import { useRegister } from "../../useRegister";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ShieldUser, CarTaxiFront, AlertCircle } from "lucide-react";

// export const RoleSelector = () => {
//   const { formData, handleRoleChange, loading, errors } = useRegister();

//   return (
//     <div>
//       <Select
//         name="role"
//         value={formData.role}
//         onValueChange={handleRoleChange}
//         disabled={loading}
//       >
//         <SelectTrigger
//           className={`w-full relative cursor-pointer pl-9 transition-all duration-200 focus:outline-none focus:ring-1 ${
//             errors.role
//               ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
//               : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
//           }`}
//         >
//           <SelectValue className="" placeholder="Select Role" />
//         </SelectTrigger>
//         <SelectContent className="">
//           <SelectItem
//             className="relative cursor-pointer pl-9"
//             value="clientadmin"
//           >
//             <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />
//             Client Admin
//           </SelectItem>
//           <SelectItem className="relative cursor-pointer pl-9" value="driver">
//             <CarTaxiFront className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />
//             Driver
//           </SelectItem>
//         </SelectContent>
//       </Select>
//       {errors.role && (
//         <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
//           <AlertCircle className="h-4 w-4" />
//           <span>{errors.role}</span>
//         </div>
//       )}
//     </div>
//   );
// };
