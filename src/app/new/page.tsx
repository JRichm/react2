"use client"
import { AddPost } from './crud';

import React, { useState } from 'react'
import MainHeader from "../components/mainHeader"

export default function NewPostPage() {

  const currentDate = new Date(Date.now());

  const [formData, setFormData] = useState({title: '', text: '', date: `${currentDate}`})

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    if (e.target.name === "reset") {
      setFormData({
        ...formData,
        date: `${currentDate.toISOString()}`
      })
      return;
    } else if (e.target.name === "date") {
      setFormData({
        ...formData,
        date: `${new Date(e.target.value).toISOString()}`
      })
    } else {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  function submitNewPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);

    const {title, text, date} = formData;
    const formDataObject = new FormData();
    formDataObject.append('title', title)
    formDataObject.append('text', text)
    formDataObject.append('date', date)

    try {
      AddPost(formDataObject)
    } catch (error) {
      console.error('(!)', error)
    }
  }

  return (
    <>
      <div className={`flex flex-row w-full justify-center`}>
        <div className='w-[1050px]'>
          <MainHeader />
          <div className='flex flex-row justify-center gap-1 p-5 mt-28'>
            <form className="flex flex-col gap-3 w-[800px] p-3 h-fit rounded-3xl bg-white" onSubmit={e => submitNewPost(e)}>
              <span className="flex flex-row gap-2 align-center">
                <input type="text" placeholder="title" className="p-3 text-2xl tracking-wider bg-gray-200/50 rounded-xl outline-none w-full" name='title' onChange={e => handleInputChange(e)} value={formData.title}></input>
                <input type="date" className="outline-none bg-gray-200/50 px-5 py-1 rounded-xl" name='date' onChange={e => handleInputChange(e)} value={`${new Date(formData.date).getFullYear()}-${(new Date(formData.date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(formData.date).getDate().toString().padStart(2, '0')}`}></input>
              </span>
                <textarea className="h-[200px] max-h-[600px] p-4 bg-gray-200/50 rounded-2xl outline-none" placeholder="text" name='text' onChange={e => handleInputChange(e)} value={formData.text}></textarea>
              <span className="flex flex-row justify-between gap-3 bottom-0 h-12">
                <input type="button" value='cancel' className=" rounded-xl p-1 w-full bg-red-300/50 hover:bg-red-300/75 hover:cursor-pointer"></input>
                <input type="submit" value='post' className="rounded-xl p-1 w-full bg-green-400/25 hover:bg-green-400/50 hover:cursor-pointer"></input>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}