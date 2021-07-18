from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from authentication.models import profile, friend_list,recieve_request,sent_request,bill
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from .bill import extract_bill
from pathlib import Path
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

@login_required
def add_friend(request,slug):
    if request.method=='POST':
        current_user = request.user
        target_user = User.objects.get(username = slug)
        temp = sent_request()
        temp2 = recieve_request()
        temp.from_user = current_user
        temp.to_user = target_user
        temp.save()
        temp2.from_user = current_user
        temp2.to_user = target_user
        temp2.save()
        return HttpResponse("Success:")

@login_required
def accept_friend(request,slug):
    if request.method=='POST':
        current_user = request.user
        target_user = User.objects.get(username = slug)
        try:
            side1 = friend_list.objects.get(user = current_user)
        except:
            temp = friend_list()
            temp.user = current_user
            temp.save()
        side1 = friend_list.objects.get(user = current_user)
        side1.friends.add(target_user)
        side1.friend_count+=1
        
        try:
            side2 = friend_list.objects.get(user = target_user)
        except:
            temp = friend_list()
            temp.user = target_user
            temp.save()

        side2 = friend_list.objects.get(user = target_user)
        side2.friends.add(current_user)
        side2.friend_count+=1
        requests = recieve_request.objects.get(from_user = target_user)
        requests.delete()
        instance = sent_request.objects.get(from_user = target_user)
        instance.delete()

        return HttpResponse("Accepted:")


        

def search(request,slug):
    if request.method=='GET':
        pass


@login_required
def default(request):
    list_of_users = User()
    data = list_of_users.username
    return render(request,'accounts.html')

@login_required
def all_users(request):
    users = User.objects.all()
    send = sent_request.objects.filter(from_user = request.user)
    
    context={
        'data' : users,
        'sent' : send
    }

    return render(request,'userlist.html',context=context)

@login_required
def recieved_requests(request):
    data = recieve_request.objects.filter(to_user=request.user)
    context = {
        'data': data
    }
    return render(request,'requests.html',context=context)

@login_required
def split(request):
    if request.method == 'POST':
        if request.FILES['myfile']:
            myfile = request.FILES['myfile']
            fs = FileSystemStorage(location='media/bills/')
            filename = fs.save(myfile.name, myfile)
            #url = 'http://127.0.0.1:8000/media/bill/'+filename    #un comments these line after production to enable those features of AI
            retrived_data = extract_bill(str(BASE_DIR/'media/bills/')+"/"+filename)
            print(retrived_data)
            request_user = request.user
            total = retrived_data[0]['total']
            friends = friend_list.objects.get(user = request_user)
            number_of_friends = friends.friend_count
            ammount_paid = total/(number_of_friends+1)
            bill_data = bill()
            bill_data.user = request.user 
            bill_data.creator = request_user.username
            bill_data.bill_image = filename
            bill_data.ammount = ammount_paid
            bill_data.save()
            for i in friends.friends.all():
                new = bill()
                new.user = i
                new.creator = request_user.username
                new.bill_image = filename
                new.ammount = ammount_paid
                new.save()
            context = {
                'name' : filename
            }
            return redirect('pendingPayment')
        else:
            pass
    return render(request,'split.html')

def pendingPayment(request):
    user = request.user
    data = bill.objects.filter(user = user)
    context = {
        'data':data
    }
    return render(request,'pendingPayment.html',context=context)

def paybills(request,slug):
    data = bill.objects.get(id=slug)
    data.delete()
    return HttpResponse("Success:")

def findfriend(request):
    profiles = profile.objects.all()
    context = {
        'data':profiles
    }
    return render(request,'findfriends.html',context=context)
