import { useEffect, useState } from "react";
import EmailEditor from "../../components/email-editor";

const data = {
  subject: "",
  to: [],
  cc: [],
  from: "",
  id: "",
}

export default function ReplyBox() {
  if(!data) return null;
  return <Component data={data} />
}

const Component = ({ data }: { data: any}) => {
  const [subject, setSubject] = useState(data.subject.startsWith('Re:') ? data.subject : `Re: ${data.subject}`);
  const [toValues, setToValues] = useState<{ label: string, value: string }[]>(data.to.map((to:any) => ({ label: to.address ?? to.name, value: to.address })) || [])
  const [ccValues, setCcValues] = useState<{ label: string, value: string }[]>(data.cc.map((cc:any) => ({ label: cc.address ?? cc.name, value: cc.address })) || [])

  useEffect(() => {
      if (!data) return;

      if (!data.subject.startsWith('Re:')) {
          setSubject(`Re: ${data.subject}`)
      }
      setToValues(data.to.map((to:any) => ({ label: to.address ?? to.name, value: to.address })))
      setCcValues(data.cc.map((cc:any) => ({ label: cc.address ?? cc.name, value: cc.address })))

  }, [data])

  const handleSend = async (value: string) => {
    if (!data || !value) return;
  }

  return (
    <EmailEditor  
        toValues={toValues}
        ccValues={ccValues}
        onToChange={(values) => {
            setToValues(values)
        }}
        onCcChange={(values) => {
            setCcValues(values)
        }}

        subject={subject}
        setSubject={setSubject}
        to={toValues.map(to => to.value)}
        handleSend={handleSend}
        isSending={false}
    />
  )
}