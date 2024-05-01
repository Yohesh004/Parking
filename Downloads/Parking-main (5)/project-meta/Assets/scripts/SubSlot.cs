using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SubSlot : MonoBehaviour
{
    public int isOccupied;

    private void OnTriggerStay(Collider other)
    {
        if (other.CompareTag("car"))
        {
            // You can optionally perform additional checks here
            // For example, you might want to check the distance between the car and the parking slot
            // to ensure it's properly parked, and then set isOccupied accordingly.

            isOccupied = 1; // For simplicity, let's assume the slot is considered occupied as long as the car is within the trigger.
            Debug.Log("Parking slot occupied.");
            Car.instance.carBack.SetActive(true);
        }
    }
    // This function is called when a car enters the parking slot
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("car"))
        {
            isOccupied = 1;
            Debug.Log("Parking slot occupied.");
            Car.instance.carBack.SetActive(false);
        }
    }

    // This function is called when a car exits the parking slot
    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("car"))
        {
            isOccupied = 0;
            Debug.Log("Parking slot vacant.");
            Car.instance.carBack.SetActive(false);
        }
    }   
}
