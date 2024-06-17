import { useContext, useState } from "react"
import { Context } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../lib/Constant";
import toast from "react-hot-toast";
import {imageDb} from "../../lib/Config"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
function Application() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [coverLetter,setCoverLetter]=useState("");
  const [phone,setPhone]=useState("");
  const [file,setFile]=useState(null);

  const {isAuthorized,user}= useContext(Context);
  const navigateTo=useNavigate();
  const {id}= useParams();

  const handleApplication=async(e)=>{
    e.preventDefault();
    let Post={
      name,
      email,
      coverLetter,
      phone,
      jobId:id
    }
    // if(file){
    //   const data=new FormData();
    //   const fileName=Date.now() + file.name;
    //   data.append("name",fileName);
    //   data.append("file",file);
    //    // Log FormData contents
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    //   try {
    //     const response = await axios.post(`${BASE_URL}/upload`, data, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     });
    //     console.log("Upload response:", response.data);
    //     Post.resume = fileName;
    //   } catch (err) {
    //     console.log(err.response ? err.response.data.message : err.message);
    //     return;
    //   }
    // }
    if(file){
      const fileName=Date.now() + file.name;
      const imageRef=ref(imageDb,`files/${fileName}`);
      await uploadBytes(imageRef,file);
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      Post.resume=downloadURL;
    }
    try{
      const {data}=await axios.post(`${BASE_URL}/v1/application/post`,Post,{withCredentials:true});
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setFile(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    }catch(error){
      toast.error(error.response.data.message);
    }

  }
  if(!isAuthorized || (user && user.role==='Employer')){
    navigateTo("");
  }
  return (
   <section className="application">
    <div className="container">
      <h3>Application</h3>
      <form onSubmit={handleApplication}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="number" placeholder="Your Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}></textarea>
        <div>
          <label style={{textAlign:'start',display:'block',fontSize:'20px'}}>
            Select Resume
          </label>
          <input type="file"  accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} style={{width:"100%"}}/>
        </div>
        <button type="submit">Send Application</button>
      </form>
    </div>
   </section>
  )
}

export default Application