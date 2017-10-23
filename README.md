#KnowItAll

#####KnowItAll provides users with a platform to share opinions, ratings, and reviews on just about anything and any subject for USC students. Essentially, it is a public forum for all students to share any knowledge with other USC students and eliminating the need to look on other resources. Resources such as Yelp for restaurants, RottenTomatoe for movies, RateMyProfessor for professor ratings, and TripAdvisor for travelling will all be handled by KnowItAll.



#KnowItAll Deployment

#Part 1: Set Up
##Prior to Cloning the Git Repository and Deploying,
##make sure that your machine has YARN or NPM installed.

###For Mac Users:
#####1. Install Homebrew by opening up terminal and running:
```
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```
#####2. Install Yarn or NPM by running:
```
	brew install yarn
```

```
	brew install npm
```

###For PC Users without Chocolatey:
#####1. Download the Installer: https://yarnpkg.com/lang/en/docs/install/#windows-tab
#####Or run the following command in cmd.exe:
```
	@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

###For PC Users with Chocolatey, 1. run:
```
	choco install yarn
```

#Part 2: Git Clone & Deployment
#####1. Open Terminal and Git Clone
```
	git clone https://github.com/rohantulsiani/KnowItAll.git
```

#####2. Change Directory into KnowItAll Directory then run:
```
	yarn install
```


#####3. After all the packages are built, run:
```
	yarn start
```


#####Alternative to yarn,1.  run: 
```
	npm install
```

#####2. After all packages are built, run:
```
	npm start
```

#####You should now be able to navigate the page:
** http://localhost:8080/webpack-dev-server/ **

