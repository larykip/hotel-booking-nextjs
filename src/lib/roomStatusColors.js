export function getStatusColors(status, secondaryStatus) {
    const primaryColor = {
        "AVAILABLE": "bg-green-500",
        "OCCUPIED": "bg-red-500",
        "MAINTENANCE": "bg-yellow-500",
        "BOOKED": "bg-purple-500"
    }[status] || "bg-gray-500";

    if (secondaryStatus === 'CLEANING') {
        return {
            primary: primaryColor,
            secondary: "bg-blue-500",
            text: `${status}${secondaryStatus === 'CLEANING' ? ' (Cleaning)' : ''}`
        };
    }

    return {
        primary: primaryColor,
        secondary: null,
        text: status
    };
}
