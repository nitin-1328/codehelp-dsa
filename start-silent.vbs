Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if port 5000 is active
Set objExec = WshShell.Exec("cmd /c netstat -ano | findstr :5000")
strOut = objExec.StdOut.ReadAll()

If InStr(strOut, "LISTENING") = 0 Then
    WshShell.Run "cmd /c """ & currentDir & "\run-server.bat""", 0, False
    WScript.Sleep 2000
End If

WshShell.Run "http://localhost:5000", 1, False
