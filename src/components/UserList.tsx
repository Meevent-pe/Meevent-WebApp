import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './ui/avatar'

const usersPictures = [
    {
        imgPath: "/people/image_161.png",
        name: "Ari"
    },
    {
        imgPath: "/people/image_616.png",
        name: "Luz"
    },
    {
        imgPath: "/people/image_632.png",
        name: "Jessie"
    }
]

interface Props {
    usersCount: number
}

export const UserList = ({ usersCount = 0 }: Props) => {
    const roundedCount = Math.floor(usersCount / 10) * 10;
    return (
        <div className='w-full flex flex-col justify-center items-center gap-1.75 mt-8 xl:flex-row xl:w-110'>
            <AvatarGroup>
                {
                    usersPictures.map(user => (
                        <Avatar key={user.imgPath}>
                            <AvatarImage
                                src={user.imgPath} />
                            <AvatarFallback>{user.name}</AvatarFallback>
                        </Avatar>
                    ))
                }
            </AvatarGroup>
            <p className='font-semibold text-white text-center text-[16px] xl:text-[20px]'>
                {roundedCount > 0 ? `+${roundedCount}` : usersCount} usuarios ya se sumaron a la lista
            </p>
        </div>
    )
}
