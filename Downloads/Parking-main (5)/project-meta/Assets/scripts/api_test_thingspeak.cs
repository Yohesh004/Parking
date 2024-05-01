using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class api_test_thingspeak : MonoBehaviour
{
    public string readAPIKey = "Q41L4QJP7I4OESZ5";
    public string channelID = "2530144";

    private string[] fieldNames = { "field1", "field2", "field3" };

    IEnumerator Start()
    {
        while (true)
        {
            yield return StartCoroutine(ReadData());
            yield return new WaitForSeconds(1f); // Wait for 1 second before next request
        }
    }

    IEnumerator ReadData()
    {
        string url = "https://api.thingspeak.com/channels/" + channelID + "/feeds/last.json?api_key=" + readAPIKey;

        using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                string jsonData = webRequest.downloadHandler.text;
                Debug.Log("Received data: " + jsonData);

                // Parse JSON data to get field values
                ThingSpeakData1 data = JsonUtility.FromJson<ThingSpeakData1>(jsonData);

                foreach (string fieldName in fieldNames)
                {
                    string fieldValue = GetFieldValue(data, fieldName);
                    Debug.Log(fieldName + " value: " + fieldValue);
                }
            }
            else
            {
                Debug.LogError("Error reading data from ThingSpeak: " + webRequest.error);
            }
        }
    }

    private string GetFieldValue(ThingSpeakData1 data, string fieldName)
    {
        switch (fieldName)
        {
            case "field1": return data.field1;
            case "field2": return data.field2;
            case "field3": return data.field3;
            default: return null;
        }
    }
}

[System.Serializable]
public class ThingSpeakData1
{
    public string field1;
    public string field2;
    public string field3;

}
