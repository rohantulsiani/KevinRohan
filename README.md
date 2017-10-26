# KnowItAll

KnowItAll provides users with a platform to share opinions, ratings, and reviews on just about any subject. Currently, the app is only open to USC students. Essentially, it is a public forum for all students to ask any questions, eliminating the need to browse a large quantity of disparate resources. 

## KnowItAll Deployment

### Part 1: Set Up
Prior to Cloning the Git Repository and Deploying, make sure that your machine has YARN or NPM installed.

#### For Mac Users:
##### 1. Install Homebrew by Opening a Terminal and Running:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)
```

##### 2. Install Yarn or NPM by Running:
```
brew install yarn
```

```
brew install npm
```

#### For PC Users Without Chocolatey:
##### 1. Download the Installer: 
> https://yarnpkg.com/lang/en/docs/install/#windows-tab

##### Alternatively Run the Following in the Windows Command Prompt:
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

#### For PC Users with Chocolatey: 
##### 1. Run:
```
choco install yarn
```

### Part 2: Git Clone & Deployment
##### 1. Open Terminal and Git Clone
```
git clone https://github.com/rohantulsiani/KnowItAll.git
```

##### 2. Change Directory into the KnowItAll Directory then Run:
```
yarn install
```


##### 3. After all the Packages are Built, Run:
```
yarn start
```


#### Alternatively Instead of Yarn Use NPM
```
npm install
```

```
npm start
```

##### View the App at Localhost on Port 8080:
> http://localhost:8080/ 

