using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEditor.Experimental.GraphView;
using UnityEngine;

public class toll : MonoBehaviour

{
    public Transform tollGate;
    public float rotationSpeed = 2f;
    public float rotationValueZ = -45f;
    public Vector3 targetRotation;
    public int isSlotAvailabe;
    public int occupiedCount;
    [SerializeField] private SubSlot[] SubSlots;
    [SerializeField] private GameObject[] Lights;
    [SerializeField] private TextMeshProUGUI slotCount;
    public void OpenToll()
    {
        targetRotation = new Vector3(0, 0, rotationValueZ);
        tollGate.transform.rotation = Quaternion.Euler(targetRotation);
        ChangeTrafficLightColor(false, true, false);// yellow color turn on 
    }
    private void Start()
    {
        CheckAvailability();
       
    }
    public void CloseToll()
    {
        CheckAvailability();
        if (tollGate.transform.eulerAngles.z == 0) 
        {
            Debug.Log("No need to Close toll called");
        }
        else 
        {
            tollGate.transform.rotation = Quaternion.Euler(new Vector3(0, 0, 0f)); 
            Debug.Log("Close toll called");
        }  
    }

    void OnTriggerEnter(Collider others)
    {
        if (others.gameObject.CompareTag("car"))
        {
            CheckAvailability();
            if (occupiedCount >= 1)
            {
                //isSlotAvailabe = 0;
            }
            else
            {
                //isSlotAvailabe = 1;
                if (isSlotAvailabe == 1)
                {
                    //OpenToll();// because of API
                    Debug.Log("toll open called from car");
                }
            }
        }
        if (others.gameObject.CompareTag("carback")) 
        {
            //OpenToll();// because of API
            Debug.Log("toll open called from carback");
        }
    }
    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.CompareTag("car"))
        {
                //CloseToll(); // Because of API
        }
        if (other.gameObject.CompareTag("carback"))
        {
            CloseToll();
            Debug.Log("toll close called from carback");
        }
        CheckAvailability();
        MainToll.instance.CheckAvailability();
        //if (Input.GetKey(KeyCode.S)&& other.gameObject.CompareTag("carback"))
        //{
        //    OpenToll();
        //}
    }

    private void CheckAvailability() 
    {
        occupiedCount = 0;
        for (int i = 0; i < SubSlots.Length; i++)
        {
            if (SubSlots[i].isOccupied >= 1)
            {
                occupiedCount++;
            }
            else
            {
                isSlotAvailabe++;
            }
        }
        if (occupiedCount > 0)
        {
            //isSlotAvailabe = 0;
            ChangeTrafficLightColor(true, false, false); // red color turn on
            slotCount.text = "SLOT AVAILABLE :" + "Nope";
        }
        else
        {
            ChangeTrafficLightColor(false, false, true);// green color turn on
            slotCount.text = "SLOT AVAILABLE :" + "Yes";
            //isSlotAvailabe = 1;
            //if (isSlotAvailabe == 1)
            //{
            //    ChangeTrafficLightColor(false, false, true);// green color turn on
            //}
        }
    }

    private void ChangeTrafficLightColor(bool red , bool yellow , bool green) 
    {
        Lights[0].SetActive(red);
        Lights[1].SetActive(yellow);
        Lights[2].SetActive(green);
    }
}