interface blogPostDataProps {
    postData: {
        title: string,
        textData: string,
        postDate: string
    }
}

export default function BlogPost({postData}: blogPostDataProps) {
    return (
        <>
            <div className="p-5 px-10 bg-white m-4 rounded-xl w-[700px]">
                <h1 className="text-2xl m-3">{postData.title}</h1>
                <p className="text-sm">{postData.textData}</p>
                <p className="text-end m-3 text-gray-500">{new Date(postData.postDate).toDateString()}</p>
            </div>
        </>
    )
}