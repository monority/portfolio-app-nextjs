import { notFound } from "next/navigation";

import MessagingAdminPage from "@/features/messaging/components/MessagingAdminPage";

import { features } from "../../../../config/features";

export default function MessagingAdminRoute() {
    if (!features.messaging) {
        notFound();
    }

    return <MessagingAdminPage />;
}