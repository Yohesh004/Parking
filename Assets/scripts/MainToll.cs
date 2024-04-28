using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class MainToll : MonoBehaviour
{
    public Transform tollGate;
    public float rotationSpeed = 2f;
    public float rotationValueZ = -45f;
    public Vector3 targetRotation;
    public int isSlotAvailabe;
    public int occupiedCount = 0;
    [SerializeField] private SubSlot[] SubSlots;
    [SerializeField] private GameObject[] Lights;
    [SerializeField] private TextMeshProUGUI[] slotCount;
    [SerializeField] private GameObject[] Tolls;

    public static MainToll instance;

    private void Awake()
    {
        instance = this;
    }
    public void OpenToll()
    {
        targetRotation = new Vector3(0, 0, rotationValueZ);
        tollGate.transform.Rotate(targetRotation);
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
            if (occupiedCount >= 3)
            {
                //isSlotAvailabe = 0;
            }
            else
            {
                //isSlotAvailabe = 1;
                if (isSlotAvailabe == 1)
                {
                    OpenToll();
                }
            }
            for (int i = 0; i < slotCount.Length; i++)
            {
                if (Tolls[i].GetComponent<toll>().occupiedCount <= 0)
                {
                    Tolls[i].GetComponent<toll>().OpenToll();
                    break;
                }
            }
        }
    }
    private void OnTriggerExit(Collider other)
    {
        CheckAvailability();
        if (other.gameObject.CompareTag("car"))
        {
            CloseToll();
        }
        //if (Input.GetKey(KeyCode.S)&& other.gameObject.CompareTag("carback"))
        //{
        //    OpenToll();
        //}
    }

    public void CheckAvailability()
    {
        occupiedCount = 0;
        for (int i = 0; i < SubSlots.Length; i++)
        {
            if (SubSlots[i].isOccupied == 1)
            {
                occupiedCount++;
            }
            //else
            //{
            //    occupiedCount--;
            //}
        }
        if (occupiedCount >= 6)
        {
            isSlotAvailabe = 0;

            ChangeTrafficLightColor(true, false, false);
        }
        else
        {
            isSlotAvailabe = 1;
            if (isSlotAvailabe == 1)
            {
                // glow the green light
                ChangeTrafficLightColor(false, false, true);
            }
        }
        for (int i = 0;i < slotCount.Length;i++) 
        {
            if(Tolls[i].GetComponent<toll>().occupiedCount <= 0) 
            {
                slotCount[i].text = "SLOT " + (i + 1) +":"+ "Yes";
            }
            else
            {
                slotCount[i].text = "SLOT " + (i + 1) +":"+ "Nope";
            }
        }
    }

    private void ChangeTrafficLightColor(bool red, bool yellow, bool green)
    {
        Lights[0].SetActive(red);
        Lights[1].SetActive(yellow);
        Lights[2].SetActive(green);
    }
}
