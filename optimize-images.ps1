Get-ChildItem . -Filter *.jpg -Recurse |
Foreach-Object {
	$NewName = [io.path]::ChangeExtension($_.FullName, ".webp")
	magick.exe convert -auto-orient $_.FullName $NewName
}