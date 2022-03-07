const BlockUser = async ({ args, User }) => {
    try {
        const { blockedBy, blockedTo } = args
        const byBlock = await User.findById(blockedBy)
        const toBlock = await User.findById(blockedTo)

        if (!toBlock || !byBlock) return { success: false, message: "User doesn't exist!" }

        if (byBlock.blocked.includes(blockedTo)) return { success: false, message: "User already blocked." }

        byBlock.blocked.push(blockedTo)
        await byBlock.save()

        return { success: true, message: `${toBlock.name} has been blocked.` }

    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = BlockUser