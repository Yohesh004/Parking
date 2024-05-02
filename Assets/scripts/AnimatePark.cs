using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimatePark : MonoBehaviour
{
    string fieldClip = "Field";


    public void ParkOnField(int field)
    {
        Animation anim = GetComponent<Animation>();
        AnimationClip cli = anim.GetClip(fieldClip + field);

        if (anim.isPlaying)
            return;

        anim.clip = cli;
        anim.Play();
    }
}
