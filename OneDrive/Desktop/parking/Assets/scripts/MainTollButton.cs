using System.Collections;
using System.Collections.Generic;
using UnityEditor.UIElements;
using UnityEngine;

public class MainTollButton : MonoBehaviour
{
    [SerializeField] GameObject TollButtons;
    [SerializeField] GameObject MainTollStsPanel;
    [SerializeField] GameObject[] TollStsPanel;
    public bool visibility = true;
    public void ButtonsVisisbility() 
    {
       TollButtons.SetActive(visibility);
       MainTollStsPanel.SetActive(visibility);
       if(visibility == false) 
       {
            for(int i = 0; i < TollStsPanel.Length; i++) 
            {
                TollStsPanel[i].SetActive(visibility);
            }
       }
       visibility = !visibility;
    }
}
