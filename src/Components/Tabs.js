import React,{useCallback} from 'react'
import "../Components/Tabs.css";
import Swal from 'sweetalert2'

export default function Tabs({onListChange,
  list,
  onChoiceChange,
  foods}) {

    const changeTabs=useCallback(
      (food)=>{
      const newList= list.map((element)=>{
        onChoiceChange(food)
        if(food==element.food){
          element.className="tabs active-tabs"
          element.food=food
          return element
        }
        else{
          element.className="tabs"
          return element
        }
      })
      onListChange(newList)
    },[onListChange])

    const showDetails =(food)=>{
      if(food.original_video_url!=null){
        Swal.fire({ 
          title: `<strong>${food.name}</strong>` ,
          text: 'Something went wrong!',
          html:`<iframe width="400" height="300" src={food.original_video_url}>`,
          showCloseButton: true,

        })
      }
      else{
        Swal.fire({ 
          title: `<strong>no video available</strong>` 
        })
      }
    }

  return (
    <div>
      <div>
        {list.map((listItem)=>{
          return (
            <button
            className={listItem.className}
            onClick={()=>changeTabs(listItem.food)}>
              {listItem.food.replace("_"," ")}
            </button>
          )
        })}
      </div>
      <div className='active-content'>
        {foods.map((food)=>{
          return (
            <div onClick={()=>showDetails(food)}
            className="card" >
              <img src={food.thumbnail_url}></img>
              <h4>{food.name}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}
