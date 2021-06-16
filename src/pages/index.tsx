import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {

  useEffect(() => {
    toast.success("Sucessoooo")
  }, [])

  return(
    <h1>Homeeeeeee</h1>
  )
}