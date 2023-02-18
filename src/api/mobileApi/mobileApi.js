import text from "../../dataset/data";
export const phones=()=>{
    
     
            const phones = [];
            const lines = text.split('\n');
            let properties = ["Model", "CPU", "Storage capacity", "RAM", "OS", "UI", "Dimensions", "Weight"];
          
            for (let i = 0; i < lines.length; i++) {
              const phoneData = {};
              const phoneLine = lines[i];
              if(phoneLine==="NEW-ORDER"){
                properties=lines[i+1].split(",");
                i=i+1;
                continue;
              }
              const phoneDetails = phoneLine.split(',');
                //console.log(phoneDetails);
             if (phoneDetails.length !== properties.length) {
                continue;
              }
          
              for (let j = 0; j < properties.length; j++) {
                phoneData[properties[j]] = phoneDetails[j]?phoneDetails[j]:undefined;
              }
              phoneData.id=i+"";
              if(phoneData.Model){
                phones.push(phoneData);
              }
             
            }
           // phones.sort((a, b) => a.Model.localeCompare(b.Model));
          //console.log(phones)
            return phones;
          }
          



