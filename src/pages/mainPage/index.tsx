
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '@/components/custom/button'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

export default function Dashboard() {
  const [result, setResult] = useState<any>({})
  const [values, setValues] = useState<any>({})

  const [loader, setLoader] = useState<boolean>(false)
  const FormSchema = z.object({
    prompt: z.string().min(2, {
      message: 'prompt must be at least 2 characters.',
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoader(true)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/generate`, data, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'access-control-allow-methods':
            'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        },
      })
      .then((res) => {
        setResult(res.data)
        console.log(res.data.expanded_query?.split(':').slice(-1)[0])

        if (res.data.expanded_query) {
          setValues({
            ...values,
            expended_query: res.data.expanded_query.split(':').slice(-1)[0],
          })
        }
        toast({
          title: 'Success!',
          description: 'Model response generated successfully.',
        })
        setLoader(false)
      })
      .catch((err) => {
        toast({
          title: 'Error!',
          description: err,
        })
        setLoader(false)
      })
  }
  function onSubmitEx(data: any) {
    console.log(data)
  }

  function handleChange(e: any) {
    setValues({
      ...values,
      expended_query: e.target.value,
    })
  }

  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4 py-0'>
        <Card className='w-full'>
          <div className='grid grid-cols-2'>
            <div>
              <CardHeader>
                <CardTitle>Product Search With Raw Query</CardTitle>
                <CardDescription>
                  Please enter a raw query to generate a response.
                </CardDescription>
              </CardHeader>
            </div>
          </div>
          <CardContent>
            <div className='grid grid-flow-row-dense grid-cols-2'>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-[500px] space-y-6'
                  >
                    <FormField
                      control={form.control}
                      name='prompt'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Raw Query</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter a query...' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      {result.expanded_query && (
                        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                          {result
                            ? result?.expanded_query?.split(':').slice(-1)[0]
                            : ''}
                        </code>
                      )}
                    </div>
                    <Button type='submit' loading={loader}>
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
              <div className='py-[30px]'>
                {result.expanded_query && (
                  <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                    {result
                      ? result?.expanded_query?.split(':').slice(-1)[0]
                      : ''}
                  </code>
                )}
              </div>
            </div>
            <br />
            <Separator />
            <div>
              <CardHeader className='pl-0'>
                <CardTitle>Product Search With Expended Query</CardTitle>
                <CardDescription>
                  Please enter a expended query to generate a response.
                </CardDescription>
              </CardHeader>
            </div>
            <div className='grid grid-flow-row-dense grid-cols-2'>
              <div>
                <div className=' w-full max-w-sm items-center space-y-3'>
                  <Label htmlFor='query'>Expended Query</Label>
                  <Input
                    type='text'
                    className='w-[500px]'
                    placeholder='Expended Query...'
                    value={values.expanded_query}
                    onChange={handleChange}
                  />
                  <br />
                  <Button type='submit' onClick={onSubmitEx}>
                    Submit
                  </Button>
                </div>
              </div>
              {/* <div className='py-[30px]'>
                <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                  {result
                    ? result?.expanded_query?.split(':').slice(-1)[0]
                    : ''}
                </code>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
]
