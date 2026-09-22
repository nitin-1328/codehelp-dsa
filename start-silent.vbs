Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if port 5000 is already active
Set objExec = WshShell.Exec("netstat -ano")
strOut = objExec.StdOut.ReadAll()

If InStr(strOut, ":5000") = 0 Then
    ' Start node server silently with window style 0 (completely hidden)
    WshShell.Run "node """ & currentDir & "\server\index.js""", 0, False
    WScript.Sleep 1500
End If

' Open in default browser
WshShell.Run "http://localhost:5000", 1, False
