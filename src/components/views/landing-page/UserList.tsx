import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

const usersPictures = [
    {
        imgPath: "/people/image_161.png",
        name: "Ari",
    },
    {
        imgPath: "/people/image_616.png",
        name: "Luz",
    },
    {
        imgPath: "/people/image_632.png",
        name: "Jessie",
    },
];

interface Props {
    usersCount: number;
}

export const UserList = ({ usersCount = 0 }: Props) => {
    return (
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-1.75 xl:max-w-114 xl:flex-row">
            <AvatarGroup>
                {usersPictures.map((user) => (
                    <Avatar key={user.imgPath}>
                        <AvatarImage src={user.imgPath} />
                        <AvatarFallback className="animate-pulse border border-white/20 bg-white/10 text-transparent backdrop-blur-md">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                ))}
            </AvatarGroup>
            <p className="text-center text-[16px] font-semibold text-white xl:text-[20px]">
                +{usersCount} usuarios ya se sumaron a la lista
            </p>
        </div>
    );
};
