import {useGetUserQuery} from "src/redux/apiSlice";
import React from "react";
import {
    Listbox,
    ListboxItem
} from "@nextui-org/listbox";
import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export default function ReportIncident() {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery();

    return (
        <section className="bg-slate-800 text-slate-100 rounded-l-xl p-8 col-span-3 space-y-4">
            <div>Please select the incident type and provide the description</div>
                <Listbox
                    aria-label="Actions"
                    onAction={(key) => alert(key)}
                >
                    <ListboxItem key="assault" className="text-danger" color="danger">Assault</ListboxItem>
                    <ListboxItem key="verbal">Verbal</ListboxItem>
                </Listbox>
            <Textarea
                label="Enter the incident summary"
                placeholder="Enter the description of the incident"
                className="max-w-xs"
            />
            <Button color="primary" onClick={
                () => alert('ok')
            }>
                Submit
            </Button>
        </section>
    )
}
