"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import getAllBiddingGoods from "@/utils/fetch"
import { Textarea } from "../ui/textarea"

const downloadFile = (url: string, filename: string) => {
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const Form = () => {
  const [keyword, setKeyword] = useState("")
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token.trim()) {
      toast("Error: Please enter a token")
      return
    }

    setIsLoading(true)

    try {
      const csvContent = await getAllBiddingGoods()
      // Create a blob
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      downloadFile(url, "bidding_goods.csv");
    } catch (error) {
      console.error("Error:", error)
      toast("Error: Failed to fetch data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>CSV File Downloader</CardTitle>
          <CardDescription>Enter your search criteria to download CSV files</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">API Token</Label>
              <Textarea
                id="token"
                className="w-full border rounded p-2"
                placeholder="Enter your API token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="query">Query</Label>
              <Textarea
                id="query"
                className="w-full border rounded p-2"
                placeholder="Enter your query"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full mt-8" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Files
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </main>
  )
}

export default Form;
