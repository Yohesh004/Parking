using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

public class LightManager : MonoBehaviour
{
    [SerializeField] private Light directionLight;
    [SerializeField] private GameObject[] streetLights;

    public void Light(bool onOrOff)
    {
        directionLight.enabled = onOrOff;
        ChangeLightBehaviour(!onOrOff);
    }

    public void ChangeLightBehaviour(bool onOrOff) 
    {
        for (int i = 0; i < streetLights.Length; i++) 
        {
            streetLights[i].gameObject.SetActive(onOrOff);
        }
    }
}
