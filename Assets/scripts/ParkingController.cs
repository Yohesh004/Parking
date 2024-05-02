using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ParkingController : MonoBehaviour
{
    public api_test_thingspeak apiService;

    public toll fieldOne;
    public toll fieldTwo;

    public GameObject curCar;

    private void Start()
    {
        apiService.UpdatedEvent += HandleData;
    }

    private void HandleData()
    {
        if (string.IsNullOrWhiteSpace(apiService.Field1))
            return;

        if ((Int32.Parse(apiService.Field1) == 1))
        {
            MainToll.instance.CloseToll();
            return;
        }

        if (Int32.Parse(apiService.Field2) == 0 || Int32.Parse(apiService.Field3) == 0)
        {
            MainToll.instance.OpenToll();
            OpenSubToll();
        }



    }

    private void OpenSubToll()
    {
        if (Int32.Parse(apiService.Field2) == 0)
        {
            fieldOne.OpenToll();
            ParkCar("1");
        }
        if (Int32.Parse(apiService.Field3) == 0)
        {
            fieldTwo.OpenToll();
            ParkCar("2");
        }

        if (Int32.Parse(apiService.Field2) == 1)
            fieldOne.CloseToll();

        if (Int32.Parse(apiService.Field3) == 1)
            fieldTwo.CloseToll();
    }

    string fieldClip = "Field";
    public Transform spawnPoint;

    public void ParkCar(string field)
    {
        var car = Instantiate(curCar, spawnPoint.position, curCar.transform.rotation);
        car.GetComponent<Animator>().SetTrigger(fieldClip + field);

    }

}
