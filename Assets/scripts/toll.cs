using System.Collections;
using System.Collections.Generic;
using UnityEditor.Experimental.GraphView;
using UnityEngine;

public class toll : MonoBehaviour

{
    public Animator myDoor = null;
    public bool openTrigger =false;
    public bool closeTrigger = false;
    private void OnTriggerEnter (Collider other){
        if (other.CompareTag("FreeRacingCar")){
            
          if (openTrigger){
            myDoor. Play("newtollo", 0, 0.0f);
            gameObject.SetActive(false);

          }
          else if (closeTrigger){
            

                 myDoor. Play("newtollc", 0, 0.0f); 
                gameObject.SetActive(false);

          }

        }

    }

}














