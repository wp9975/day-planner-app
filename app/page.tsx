import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import PromptField from "@/components/components/PromptField"
import React from "react"

export default function IndexPage() {
  

  return (
    <section className="container flex items-center justify-center min-h-screen ">
      
        <PromptField  />

    </section>
  )
}
