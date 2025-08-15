"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface Props {
    onCreate: (orgData: {
        name: string;
        type: string;
        country: string;
        state: string;
        region: string;
        ico_registered: boolean;
        data_retention_years: number;
    }) => void;
}

export default function CreateOrganizationDialog({ onCreate }: Props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [country, setCountry] = useState("");
    const [stateVal, setStateVal] = useState("");
    const [region, setRegion] = useState("");
    const [icoRegistered, setIcoRegistered] = useState(false);
    const [dataRetentionYears, setDataRetentionYears] = useState<number>(0);

    const handleCreate = () => {
        if (!name || !type || !country || !stateVal || !region) {
            toast.error("Please fill in all required fields");
            return;
        }

        onCreate({
            name,
            type,
            country,
            state: stateVal,
            region,
            ico_registered: icoRegistered,
            data_retention_years: dataRetentionYears,
        });

        toast.success("Organization created successfully");
        setOpen(false);
        setName("");
        setType("");
        setCountry("");
        setStateVal("");
        setRegion("");
        setIcoRegistered(false);
        setDataRetentionYears(3);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="primary-button cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Organization
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
                <AlertDialogHeader>
                    <div className="flex items-center justify-between">
                        <AlertDialogTitle>Create New Organization</AlertDialogTitle>
                        <AlertDialogCancel className="bg-transparent"><XIcon /></AlertDialogCancel>
                    </div>


                    <AlertDialogDescription className="text-gray-400">
                        Add a new organization to the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Organization name"
                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="finance">Financial Services</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="clinic">Clinic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Country */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="country" className="text-right">
                            Country
                        </Label>
                        <Input
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* State */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="state" className="text-right">
                            State
                        </Label>
                        <Input
                            id="state"
                            value={stateVal}
                            onChange={(e) => setStateVal(e.target.value)}
                            placeholder="State"
                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* Region */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="region" className="text-right">
                            Region
                        </Label>
                        <Input
                            id="region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="Region"
                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* ICO Registered */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ico" className="text-right">
                            ICO Registered
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Switch
                                id="ico"
                                checked={icoRegistered}
                                onCheckedChange={setIcoRegistered}
                            />
                            <span className="text-gray-300 text-sm">
                                {icoRegistered ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>

                    {/* Data Retention Years */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dataRetention" className="text-right">
                            Data Retention (Years)
                        </Label>
                        <Input
                            id="dataRetention"
                            type="number"
                            min={1}
                            value={dataRetentionYears}
                            onChange={(e) => setDataRetentionYears(Number(e.target.value))}
                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </div>

                <AlertDialogFooter>
                    <Button type="submit" className="primary-button" onClick={handleCreate}>
                        Create Organization
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
