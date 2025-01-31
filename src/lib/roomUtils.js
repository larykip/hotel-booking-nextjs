export const updateRoomStatus = async (roomId, bookingId = null, status = 'AVAILABLE') => {
    try {
        const result = await Room.findByIdAndUpdate(roomId, {
            status: status,
            activeBooking: bookingId
        }, { new: true })
        .populate({
            path: 'activeBooking',
            populate: {
                path: 'customer',
                select: 'firstName lastName emailAddress'
            }
        });
        return result;
    } catch (error) {
        console.error('Error updating room status:', error);
        throw error;
    }
};
