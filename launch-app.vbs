Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

electronExe = currentDir & "\node_modules\electron\dist\electron.exe"

' Launch native Electron Desktop Window
WshShell.Run """" & electronExe & """ """ & currentDir & """", 1, False
