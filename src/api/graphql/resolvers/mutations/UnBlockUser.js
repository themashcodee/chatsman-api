const UnBlockUser = async ({ args, User }) => {
    try {
        const { unBlockedBy, unBlockedTo } = args
        const byUnBlock = await User.findById(unBlockedBy)
        const toUnBlock = await User.findById(unBlockedTo)

        if (!toUnBlock || !byUnBlock) return { success: false, message: "User doesn't exist!" }

        if (!byUnBlock.blocked.includes(unBlockedTo)) return { success: false, message: "User not founc blocked list." }

        const newList = byUnBlock.blocked.filter(id => id !== unBlockedTo)
        byUnBlock.blocked = newList
        await byUnBlock.save()

        return { success: true, message: `${toUnBlock.username} has been unblocked.` }

    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = UnBlockUser