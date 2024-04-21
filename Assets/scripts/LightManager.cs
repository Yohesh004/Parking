using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightManager : MonoBehaviour
{
    [SerializeField] private Light directionLight;

    public void LightOn()
    {
        directionLight.enabled = true;
    }

    public void LightOff()
    {
        directionLight.enabled = false;
    }
}
