import React from "react";
import {
    Listbox,
    ListboxItem
} from "@nextui-org/listbox";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";
import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useAddIncidentMutation} from 'src/redux/apiSlice';
import { useEffect, useState } from "react";
import {Incident} from "src/models/Incident";
import {useSession} from "next-auth/react";

export default function ReportIncident() {
    /*const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery();*/
    const { data: session } = useSession();
    const [phone, setPhone] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [addIncident] = useAddIncidentMutation();

    const handleChange = async () => {
        alert(JSON.stringify(session))
        const incident:Incident = new Incident();
        // TODO take phone from the session
        // @ts-ignore
        incident.phone = session.user.name;
        incident.category = selectedValue;
        incident.description = description;
        //alert(selectedValue);
        //alert(description);
        console.log(`category=${selectedValue}`);
        console.log(`description=${description}`);
        console.log(`incident=${JSON.stringify(incident)}`);
        addIncident({incident});
    };

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["assault"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <section className="bg-slate-800 text-slate-100 rounded-l-xl p-8 col-span-3 space-y-4">
            <div>Please select the incident type and provide the description</div>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">{selectedValue}</Button>
                </DropdownTrigger>
                <DropdownMenu
                              variant="flat"
                              closeOnSelect={false}
                              disallowEmptySelection
                              selectionMode="multiple"
                              selectedKeys={selectedKeys}
                              onSelectionChange={setSelectedKeys}>
                    <DropdownItem key="assault" className="text-danger" color="danger">Assault</DropdownItem>
                    <DropdownItem key="verbal">Verbal</DropdownItem>
                    <DropdownItem key="other">Other</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Textarea
                label="Enter the incident summary"
                placeholder="Enter the description of the incident"
                className="max-w-xs"
                onChange={event => {
                    setDescription(
                        event.target.value
                    );
                }}
            />
            <Button color="primary" onClick={
                () => handleChange()
            }>
                Submit
            </Button>
        </section>
    )
}
