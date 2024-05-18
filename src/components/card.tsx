import React from 'react'

export default function Card(props: { children: React.ReactNode, classname?: string}) {

    return (
        <div className={`${props.classname} py-5 rounded-md my-2 border border-gray-800 px-4`}>
            {props.children}
        </div>
    )
}