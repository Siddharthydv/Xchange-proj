import { useEffect ,useState} from "react";
import { getAssets } from "@/app/utils/httpClient";
import { setgid } from "process";
export function Assets(){
    const [data,setData]=useState<any[]>([]);
    const[hideColumn,setHidden]=useState(false)
    const[hiddenOnes,setOnes]=useState<any[]>([])
    const[balvis,setBalvis]=useState(false)
    useEffect(()=>{
        async function A(){
            const response=await getAssets();
          
           console.log(response)
            let temp:{ currency: string; available: any; locked: any; }[]=Object.entries(response).map(([currency,data]:[currency:any,data:any])=>({
                currency,
                available:data.available,
                locked:data.available
            }))
            // console.log(temp)
            setData(temp);
        }
        A();
    },[])

    function setColumn(){
      if(!hideColumn){
        const tmp=data.filter(r=>Number(r.available)+Number(r.locked)!==0)
        const hiddenOnes=data.filter(r=>Number(r.available)+Number(r.locked)===0)
        setData(tmp);
        setOnes(hiddenOnes)
        setHidden(true)
      }
      else
      {
        setData(prev=>{return [...prev,...hiddenOnes]})
        setHidden(false);
      }
      
    }

    return  <div className="flex flex-col w-full space-y-6">
        <div>
        <div className="flex items-end justify-between flex-row">
  <div className="flex items-end flex-row gap-2">
    <div className="flex flex-col relative bottom-[0.5px]">
      <p className="font-medium text-xs text-baseTextMedEmphasis">Your Balances</p>
      <span className="mt-1 text-sm font-medium tabular-nums leading-4 text-baseTextHighEmphasis">
        <p className="font-medium text-baseTextHighEmphasis text-lg">
          <span id="balance" className="tabular-nums">*******</span>
        </p>
      </span>
    </div>
   
    <div className="flex justify-center flex-col h-[28px]">
      <button
        onClick={()=>{
          if(balvis)
          {
          (document.getElementById("balance") as HTMLElement).innerText = "*******";
            setBalvis(false);
          }
          else{
            let sum=0;
            data.forEach((d) => {
              sum += (Number(d.available) + Number(d.locked)) * 80;
          });
          (document.getElementById("balance") as HTMLElement).innerText = `${sum}`;
            setBalvis(true);
          }
        }}
        type="button"
        className="text-baseIcon hover:text-baseIconHover"
        data-rac=""
        id="react-aria7795446530-:rnf:"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-eye h-5 w-5"
        >
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </div>
  </div>
  <div className="flex flex-row">
    <div className="flex items-center flex-row">
      <input
        className="form-checkbox rounded border-2 border-baseBorderMed bg-base-950 text-transparent shadow-transparent outline-none ring-0 ring-transparent checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:ring-0 focus:ring-offset-0 focus:checked:border-baseBorderMed h-5 w-5 cursor-pointer"
        type="checkbox"
        id="zeroBalances"
        onClick={setColumn}
      />
    </div>
    <label
      className="font-medium text-baseTextMedEmphasis select-none text-sm ml-2 cursor-pointer"
      htmlFor="zeroBalances"
    >
      Hide zero balances
    </label>
  </div>
</div>

        </div>
        
        <table className="min-w-full ">
    <thead>
<tr>

    <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
    <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-start text-left">
        Asset
    </div>
    </th>

    <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
    <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
        <button type="button" className="" data-rac="" id="react-aria7551413685-:r7j:">Total</button>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-down h-4 w-4"
        >
        <path d="M12 5v14"></path>
        <path d="m19 12-7 7-7-7"></path>
        </svg>
    </div>
    </th>
    
    
    <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
    <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
        <button type="button" className="" data-rac="" id="react-aria7551413685-:r7m:">Available</button>
    </div>
    </th>

    <th className="border-b border-baseBorderLight pb-1 text-xs font-medium text-baseTextMedEmphasis">
    <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
        Locked
    </div>
    </th>
    
    
</tr>
    </thead>
    <tbody className="gap-2 divide-y divide-black">
  {data?.map(record => {
    return (
      <tr key={record.currency} className="hover:bg-white/4">
        {/* Asset Column */}
        <td className="w-[5%] px-1 py-4 text-sm tabular-nums"> {/* Increased py-2 to py-4 */}
          <a href="/trade/AAVE_USDC">
            <div className="flex items-center py-0">
              <div
                className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
                style={{ width: "36px", height: "36px" }}
              >
                <div className="relative">
                  <img
                    alt="AAVE Logo"
                    loading="lazy"
                    width="36"
                    height="36"
                    decoding="async"
                    data-nimg="1"
                    className=""
                    src={record.currency==="SOL"?'/sol.webp':'/btc.webp'}
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
              <div className="ml-2 flex flex-col">
                <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
                  {record.currency}
                </p>
              </div>
            </div>
          </a>
        </td>

        {/* Total Balance Column */}
        <td className="text-right w-[20%] px-1 py-4 text-sm tabular-nums"> {/* Increased py-2 to py-4 */}
          <div className="flex items-end flex-col gap-1.5">
            <p className="font-medium text-baseTextHighEmphasis">
              {Number(record.available) + Number(record.locked)}<br></br>
              ${"rps"}
            </p>
          </div>
        </td>

        {/* Available Balance Column */}
        <td className="text-right w-[20%] px-1 py-4 text-sm tabular-nums"> {/* Increased py-2 to py-4 */}
          <div className="flex items-end flex-col">
            <p className="font-medium text-baseTextHighEmphasis">{record.available}</p>
          </div>
        </td>

        {/* Open Orders Column */}
        <td className="text-right w-[20%] px-1 py-4 text-sm tabular-nums"> {/* Increased py-2 to py-4 */}
          <div className="flex items-end flex-col">
            <p className="font-medium text-baseTextHighEmphasis">{record.locked}</p>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

</table>
</div>
}